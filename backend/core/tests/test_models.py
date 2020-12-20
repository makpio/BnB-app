from unittest.mock import patch

from django.test import TestCase
from django.contrib.auth import get_user_model

from core import models


class ModelTests(TestCase):

    def test_tag_str(self):
        """Test the task string representation"""
        task = models.Task.objects.create(
            name='Task1'
        )

        self.assertEqual(str(task), task.name)
