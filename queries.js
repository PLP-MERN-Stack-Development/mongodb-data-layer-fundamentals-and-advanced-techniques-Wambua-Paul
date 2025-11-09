// Find all books in a specific genre
db.books.find({genre:"Fiction"})
db.books.find({genre:"Romance"})
db.books.find({genre:"Political Satire"})

// Find books published after a certain year
db.books.find({published_year:{$gt:1930}})

// Find books by a specific author
db.books.find({author:"Harper Lee"})
db.books.find({author:"Paulo Coelho"})

// Update the price of a specific book
db.books.updateOne({title:"Animal Farm"},{$set:{price:"15.9"}})

// Delete a book by its title
db.books.deleteOne({title:"Moby Dick"})

// Write a query to find books that are both in stock and published after 2010
db.books.find({in_stock:"true",published_year:{$gt:2010}})

// Use projection to return only the title, author, and price fields in your queries
db.books.find({title: 1,author: 1,price: 1,_id: 0})

// Implement sorting to display books by price (both ascending and descending)
db.books.find().sort({ price: 1 })
db.books.find().sort({ price: -1 })

// Use the `limit` and `skip` methods to implement pagination (5 books per page)
db.books.find({}).sort({price:-1}).skip(10).limit(5)

// Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate({$group:{_id:"genre",averageprice:{$avg:"$price"}}})

// Create an aggregation pipeline to find the author with the most books in the collection
db.books.aggregate({$group:{_id:"author"},totalbooks:{$sum:1}})

// Implement a pipeline that groups books by publication decade and counts them
db.books.aggregate([
  {
    $addFields: {
      decade: {
        $multiply: [
          { $floor: { $divide: ["$published_year", 10] } }, // e.g. 194 -> 194
          10                                                 // -> 1940
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",           // Group by computed decade
      totalBooks: { $sum: 1 }   // Count how many books per decade
    }
  },
  {
    $sort: { _id: 1 }           // Sort decades in ascending order
  },
  {
    $project: {
      _id: 0,
      decade: "$_id",
      totalBooks: 1
    }
  }
])

// Create an index on the `title` field for faster searches
db.books.createIndex({ title: 1 })

// Create a compound index on `author` and `published_year`
db.books.createIndex({author:1,published_year:-1})

// Use the `explain()` method to demonstrate the performance improvement with your indexes
db.books.find({ title: "The Hobbit" }).explain()






















