package routes

import (
	"github.com/bredcool/backend/handlers"
	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	app.Get("/articles", handlers.GetArticles)
	app.Get("/articles/:id", handlers.GetArticle)
	app.Post("/articles", handlers.CreateArticle)
	app.Put("/articles/:id", handlers.UpdateArticle)
	app.Delete("/articles/:id", handlers.DeleteArticle)
}
