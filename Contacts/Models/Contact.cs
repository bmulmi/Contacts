using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace Contacts.Models
{
    public class Contact
    {
        [BsonId] // this designates the following property as the primary key
        [BsonRepresentation(BsonType.ObjectId)] // this allows passing the parameter as type string instead of ObjectId structure and allows mongo to handle the conversion from string to ObjId.
        public string Id { get; set; }

        [BsonElement("Name")]
        [JsonProperty("Name")]
        public string Name { get; set; }

        [BsonElement("Email")]
        [JsonProperty("Email")]
        public string Email { get; set; }

        [BsonElement("Phone")]
        [JsonProperty("Phone")]
        public decimal Phone { get; set; }

        [BsonElement("Location")]
        [JsonProperty("Location")]
        public string Location { get; set; }

    }
}
