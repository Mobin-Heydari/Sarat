from rest_framework import serializers
from .models import Contact



class ContactSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = '__all__'
    

    def create(self, validated_data):
        instance = Contact.objects.create(
            status="N",
            title=validated_data['title'],
            content=validated_data['content'],
            f_name=validated_data['f_name'],
            l_name=validated_data['l_name'],
            phone=validated_data.get('phone'),
            email=validated_data['email'],
            ip_address=validated_data.get('ip_address'),
            user_agent=validated_data.get('user_agent'),
            attachment=validated_data.get('attachment')
        )
        # The create() method already saves the instance,
        # but calling save() here is harmless if you need to trigger extra logic.
        instance.save()
        return instance