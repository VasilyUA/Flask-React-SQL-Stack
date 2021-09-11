from flask import jsonify, request
from functools import wraps


def validationArticle(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        title = request.json['title']
        description = request.json['description']
        if not title or not description:
            return jsonify({"msg": "Enter title!"}), 400
        return f(*args, **kwargs)
    return decorated_function
