from rest_framework import serializers
from .models import Rating, Image, Game


# 특정 필드만 선택
class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed.
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop("fields", None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


# 게임 이미지
class GameImageSerialzer(DynamicFieldsModelSerializer):
    imagePath = serializers.CharField(source = "image_path")
    class Meta:
        model = Image
        fields = ["imagePath"]

class GameNameSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Game
        fields = ["game_name"]


# 게임 추천 결과
class GameRecommendationSerializer(DynamicFieldsModelSerializer):

    gameImage = GameImageSerialzer(many=True, read_only=True, source="game_image")
    gameId = serializers.IntegerField(source="game_id")
    gameName = serializers.CharField(source = "game_name")

    class Meta:
        model = Game
        fields = ["gameId", "gameName", "score", "gameImage"]
