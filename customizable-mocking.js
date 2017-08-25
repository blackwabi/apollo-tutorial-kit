
// customize mocking per type (i.e. Integer, Float, String)
mockServer(schema, {
  Int: () => 6,
  Float: () => 22.1,
  String: () => 'Hello',
});

// customize mocking per field in the schema (i.e. for Person.name and Person.age)
mockServer(schema, {
  Person: () => ({
    name: casual.name,
    age: () => casual.integer(0,120),
  })
});

// mock lists of specific or random length( and lists of lists of lists …)
mockServer(schema, {
  Person: () => {
    // a list of length between 2 and 6
    friends: () => new MockList([2,6]),
    // a list of three lists of two items: [[1, 1], [2, 2], [3, 3]]
    listOfLists: () => new MockList(3, () => new MockList(2)),
  },
});

// customize mocking of a field or type based on the query arguments
mockServer(schema, {
  Person: () => {
    // the number of friends in the list now depends on numPages
    paginatedFriends: (o, { numPages }) => new MockList(numPages * PAGE_SIZE),
  },
});

// You can also disable mocking for specific fields, pass through to the backend, etc.
