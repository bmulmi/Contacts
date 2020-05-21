namespace Contacts.Models
{
    public class ContactDatabaseSettings : IContactDatabaseSettings
    {
        public string ContactsCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface IContactDatabaseSettings
    {
        string ContactsCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
