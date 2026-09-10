import secrets

from django.core.management.base import BaseCommand

from contribute.models import ExtensionLicense


class Command(BaseCommand):
    help = "Create an extension license key (1 device by default)."

    def add_arguments(self, parser):
        parser.add_argument("--label", default="", help="Customer note")
        parser.add_argument("--devices", type=int, default=1, help="Max Chrome installs")
        parser.add_argument("--key", default="", help="Use this key instead of random")

    def handle(self, *args, **options):
        key = (options["key"] or "").strip() or secrets.token_urlsafe(24)
        lic, created = ExtensionLicense.objects.get_or_create(
            key=key,
            defaults={
                "label": options["label"] or "",
                "max_devices": max(1, options["devices"]),
                "active": True,
            },
        )
        if not created:
            lic.label = options["label"] or lic.label
            lic.max_devices = max(1, options["devices"])
            lic.active = True
            lic.save()
            self.stdout.write(self.style.WARNING(f"Updated existing key: {lic.key}"))
        else:
            self.stdout.write(self.style.SUCCESS(f"Created license key: {lic.key}"))
        self.stdout.write(f"  label={lic.label or '(none)'}  max_devices={lic.max_devices}")
