package handlers

import (
	"database/sql"

	"github.com/bredcool/backend/db"
	"github.com/bredcool/backend/models"
	"github.com/gofiber/fiber/v2"
)

// GET all articles
func GetArticles(c *fiber.Ctx) error {
	status := c.Query("status", "") // opsional: ?status=published
	var rows *sql.Rows
	var err error

	if status != "" {
		rows, err = db.DB.Query("SELECT id, title, content, category, status, created_at, updated_at FROM articles WHERE status = ?", status)
	} else {
		rows, err = db.DB.Query("SELECT id, title, content, category, status, created_at, updated_at FROM articles")
	}

	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	defer rows.Close()

	var articles []models.Article
	for rows.Next() {
		var article models.Article
		if err := rows.Scan(&article.ID, &article.Title, &article.Content, &article.Category, &article.Status, &article.CreatedAt, &article.UpdatedAt); err != nil {
			return c.Status(500).JSON(fiber.Map{"error": err.Error()})
		}
		articles = append(articles, article)
	}
	return c.JSON(articles)
}

// GET single article
func GetArticle(c *fiber.Ctx) error {
	id := c.Params("id")
	var article models.Article
	err := db.DB.QueryRow("SELECT id, title, content, category, status, created_at, updated_at FROM articles WHERE id = ?", id).
		Scan(&article.ID, &article.Title, &article.Content, &article.Category, &article.Status, &article.CreatedAt, &article.UpdatedAt)

	if err != nil {
		return c.Status(404).JSON(fiber.Map{"error": "Article not found"})
	}
	return c.JSON(article)
}

// POST create article
func CreateArticle(c *fiber.Ctx) error {
	var article models.Article
	if err := c.BodyParser(&article); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	_, err := db.DB.Exec("INSERT INTO articles (title, content, category, status) VALUES (?, ?, ?, ?)",
		article.Title, article.Content, article.Category, article.Status)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"message": "Article created"})
}

// PUT update article
func UpdateArticle(c *fiber.Ctx) error {
	id := c.Params("id")
	var article models.Article
	if err := c.BodyParser(&article); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid input"})
	}

	_, err := db.DB.Exec("UPDATE articles SET title=?, content=?, category=?, status=? WHERE id=?",
		article.Title, article.Content, article.Category, article.Status, id)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"message": "Article updated"})
}

// SOFT DELETE article
func DeleteArticle(c *fiber.Ctx) error {
	id := c.Params("id")
	_, err := db.DB.Exec("UPDATE articles SET status='trashed' WHERE id=?", id)
	if err != nil {
		return err
	}
	return c.JSON(fiber.Map{"message": "Article moved to trash"})
}
