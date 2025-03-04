from django.shortcuts import render, redirect
from django.contrib import messages

# Create your views here.
from django.http import JsonResponse
from .forms import TodoForm
from .models import Todo
from django.views.decorators.csrf import csrf_exempt
import json

# def index(request):
#     item_list = Todo.objects.order_by("-date")
#     if request.method == "POST":
#         form = TodoForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('todo')
    
#     form = TodoForm()

#     page = {
#         "forms" : form,
#         "list": item_list,
#         "title": "TODO LIST",
#     }
#     return render(request, 'todo/index.html', page)
@csrf_exempt
def index(request):
    print("request_27 : ", request)
    if request.method == 'POST':
        print('asgfhgvcg')
        try:
            data = json.loads(request.body)

            title = data.get('title')
            details = data.get('details')
            date = data.get('date')

            if not title:
                return JsonResponse({"error":"Title is required."}, status=400)
            
            new_todo = Todo.objects.create(title=title, details=details, date=date)
            
            response_data = {
                "id": new_todo.id,
                "title": new_todo.title,
                "details": new_todo.details,
            }
            return JsonResponse(response_data, status=201)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data."}, status=400)
    elif request.method == 'GET':
        item_list = Todo.objects.order_by("-date")
        todos = [{"id": item.id, "title": item.title, "details": item.details, "date": item.date} for item in item_list]
        return JsonResponse({"todos": todos})

@csrf_exempt
def remove(request, item_id):
    print(item_id)
    item = Todo.objects.get(id=item_id)
    item.delete()
    messages.info(request, "item removed!!!")
    return redirect('todo')