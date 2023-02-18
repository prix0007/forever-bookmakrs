
Bookmarks
- URL
- Name (By default domain name stripped to 10 character)
- Collection

Collection
- Bookmarks
- Collections 
 

User add bookmark, it updates the main json schema.

{
    root: {
        bookmarks: []
        collections: []
    }
}

### Serialization and Deserialization fron storage
- Store using bn54 encoding to compress (JSON.stringify -> bn54 encode)
- bn54 encoded -> bn54 decode -> json.parse