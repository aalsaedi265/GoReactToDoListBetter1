
package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

type Todo struct{
	ID int `json:"id"`
	Title string `json: "title"`
	Done bool `json:"done"`
	Body int `json:"body"`
}


func main(){
	fmt.Print("the world")
	app := fiber.New()

	todos := []Todo{}

	app.Get("/heathcheck", func(c*fiber.Ctx)error{
		return c.SendString("OK")
	})

	app.Post("/api/todos", func(c*fiber.Ctx)error{
		todo := &Todo{}
		err := c.BodyParser(todos)
		if  err != nil{
			return err
		}
		todo.ID = len(todos)+1
		todos = append(todos, *todo)
	})

	log.Fatal(app.Listen(":4000") )
}