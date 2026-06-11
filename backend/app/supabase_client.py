import json
import os
import urllib.error
import urllib.request
from datetime import datetime, timezone

from fastapi import HTTPException, status


SUPABASE_URL = os.getenv("SUPABASE_URL", "").rstrip("/")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
CONTACT_TABLE = "contact_messages"


def is_supabase_configured():
    return bool(SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)


def save_contact_message(payload):
    if not is_supabase_configured():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Supabase is not configured.",
        )

    record = {
        "name": payload.name,
        "email": str(payload.email),
        "message": payload.message,
        "source": "dc-sports-landing",
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    request = urllib.request.Request(
        f"{SUPABASE_URL}/rest/v1/{CONTACT_TABLE}",
        data=json.dumps(record).encode("utf-8"),
        method="POST",
        headers={
            "apikey": SUPABASE_SERVICE_ROLE_KEY,
            "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=10) as response:
            saved_records = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        detail = error.read().decode("utf-8") or str(error)
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Supabase insert failed: {detail}",
        ) from error
    except urllib.error.URLError as error:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Supabase is unreachable: {error.reason}",
        ) from error

    return saved_records[0] if saved_records else record
