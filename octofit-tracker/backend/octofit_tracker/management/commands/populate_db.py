from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Connect to MongoDB
        client = MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']

        # Clear collections
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # Create unique index on email
        db.users.create_index([("email", 1)], unique=True)

        # Sample users
        users = [
            {"name": "Iron Man", "email": "ironman@marvel.com", "team": "marvel"},
            {"name": "Captain America", "email": "cap@marvel.com", "team": "marvel"},
            {"name": "Batman", "email": "batman@dc.com", "team": "dc"},
            {"name": "Wonder Woman", "email": "wonderwoman@dc.com", "team": "dc"},
        ]
        db.users.insert_many(users)

        # Sample teams
        teams = [
            {"name": "marvel", "members": ["ironman@marvel.com", "cap@marvel.com"]},
            {"name": "dc", "members": ["batman@dc.com", "wonderwoman@dc.com"]},
        ]
        db.teams.insert_many(teams)

        # Sample activities
        activities = [
            {"user": "ironman@marvel.com", "activity": "Running", "duration": 30},
            {"user": "cap@marvel.com", "activity": "Cycling", "duration": 45},
            {"user": "batman@dc.com", "activity": "Swimming", "duration": 25},
            {"user": "wonderwoman@dc.com", "activity": "Yoga", "duration": 40},
        ]
        db.activities.insert_many(activities)

        # Sample leaderboard
        leaderboard = [
            {"team": "marvel", "points": 75},
            {"team": "dc", "points": 65},
        ]
        db.leaderboard.insert_many(leaderboard)

        # Sample workouts
        workouts = [
            {"user": "ironman@marvel.com", "workout": "Pushups", "reps": 50},
            {"user": "cap@marvel.com", "workout": "Situps", "reps": 60},
            {"user": "batman@dc.com", "workout": "Pullups", "reps": 30},
            {"user": "wonderwoman@dc.com", "workout": "Squats", "reps": 70},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
