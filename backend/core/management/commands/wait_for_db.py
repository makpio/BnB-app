import time

from django.db import connections
from django.db.utils import OperationalError
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """"Django command to pause exe until db is available"""

    def handle(self, *args, **options):
        self.stdout.write('Waiting for db...')
        db_conn = None
        while not db_conn:
            try:
                db_conn = connections['default']
            except OperationalError:
                self.stdout.write('Database unavailable, waiting 1s...')
                time.sleep(1)

        self.stdout.write(self.style.SUCCESS('Database available!!!'))
