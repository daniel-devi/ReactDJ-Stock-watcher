from rest_framework import serializers
from .models import User, generate_username

# Create your serializers here.

class UserModelSerializer(serializers.ModelSerializer):
    """
    Serializer for creating an API from the Django User Model.

    -This serializer is used for creating new user accounts.
    -This serializer is used for displaying and interacting with user data.

    -It ensures that user information including sensitive fields.

    """
    class Meta:
        model = User
        fields = ["id", "username", "password", "first_name", "last_name", "email", "date_joined"]
        extra_kwargs = {
            "password": {"write_only": True},  # Ensure password is write-only for security
            "date_joined": {"read_only": True},  # Prevent modification of auto-generated date_joined field
            "username": {"required": False},  # Allow username to be optional
        }

    def create(self, validated_data):
        """
        Create a new user with the provided validated data.
        Hashes the password before saving the user.
        """
        if "username" not in validated_data:
            validated_data["username"] = generate_username()
        return User.objects.create_user(**validated_data)