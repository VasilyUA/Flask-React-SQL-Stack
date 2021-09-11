from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_cors import CORS
from middleware.validationArticle import validationArticle
from config import Configuration


app = Flask(__name__)
app.config.from_object(Configuration)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://phpmyadmin:2820@localhost/flask"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)


class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.Text())
    date = db.Column(db.DateTime(), default=datetime.datetime.now)

    def __init__(self, title, description):
        self.title = title
        self.description = description


class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'description', 'date')


article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)


@app.route("/", methods=['GET'])
@app.route("/get", methods=['GET'])
def get_articles():
    all_articless = Articles.query.all()
    results = articles_schema.dump(all_articless)
    return jsonify(results), 200


@app.route("/get/<id>/", methods=['GET'])
def detail_articles(id):
    article = Articles.query.get(id)
    return article_schema.jsonify(article), 200


@app.route("/add", methods=['POST'])
@validationArticle
def add_articles():
    title = request.json['title']
    description = request.json['description']

    articles = Articles(title, description)
    db.session.add(articles)
    db.session.commit()
    return article_schema.jsonify(articles), 201


@app.route("/update/<id>/", methods=['PUT'])
def update_article(id):
    article = Articles.query.get(id)

    title = request.json['title']
    description = request.json['description']

    article.title = title
    article.description = description

    db.session.commit()
    return article_schema.jsonify(article), 200


@app.route("/delete/<id>/", methods=['DELETE'])
def delete_articles(id):
    article = Articles.query.get(id)
    db.session.delete(article)
    db.session.commit()
    return article_schema.jsonify(article), 200


@app.errorhandler(404)
def page_not_found(error):
    return jsonify({"msg": "Api not found!", "error": error}), 404
