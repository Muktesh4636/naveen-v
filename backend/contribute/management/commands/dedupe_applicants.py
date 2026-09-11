from django.core.management.base import BaseCommand

from contribute.dedupe import dedupe_applicants


class Command(BaseCommand):
    help = "Merge duplicate Applicant rows (same email / portal id / name)."

    def handle(self, *args, **options):
        result = dedupe_applicants()
        self.stdout.write(
            self.style.SUCCESS(
                f"Dedupe done: {result['before']} → {result['after']} "
                f"(removed {result['removed']}), "
                f"remaining id dup groups={result['remaining_id_dup_groups']}"
            )
        )
