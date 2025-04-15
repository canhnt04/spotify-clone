from rest_framework.views import APIView
from rest_framework import response, status
from django.http import HttpResponseRedirect
from .credentials import CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
