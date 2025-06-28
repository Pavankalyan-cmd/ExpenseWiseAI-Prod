"""
URL configuration for expensetracker project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import ExpenseListCreateView, ExpenseDetailView, IncomeListCreateView,IncomeDetailView,UserDetailView,UserListCreateView,ExpenseListCreateViewLlm,LangChainAgentView,IncomeListCreateViewLlm,ResetAllTransactionsView

urlpatterns = [
    path('admin/', admin.site.urls),
 path('', include('expensetracker.urls'))
]


urlpatterns = [
    # users
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<str:pk>/', UserDetailView.as_view(), name='user-detail'),

    # llm — put this BEFORE dynamic `<str:pk>` route
    path('expenses/add/', ExpenseListCreateViewLlm.as_view(), name='add-expense'),
    path('income/add/', IncomeListCreateViewLlm.as_view(), name='add-income'),


    # expenses
    path('expenses/', ExpenseListCreateView.as_view(), name='expense-list-create'),
    path('expenses/<str:pk>/', ExpenseDetailView.as_view(), name='expense-detail'),

    # incomes
    path('incomes/', IncomeListCreateView.as_view(), name='income-list-create'),
    path('incomes/<str:pk>/', IncomeDetailView.as_view(), name='income-detail'),
    
    #reset 
    path('reset-transactions/', ResetAllTransactionsView.as_view(), name='reset-transactions'),

    # langchain
    path("ai/agent/", LangChainAgentView.as_view(), name="langchain-agent"),
]
