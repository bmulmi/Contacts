using Contacts.Models;
using Contacts.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;

namespace Contacts
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // this registers the appsettings.json file's ContactDatabaseSettings section in Dependency Injection container
            services.Configure<ContactDatabaseSettings>(Configuration.GetSection(nameof(ContactDatabaseSettings)));

            // this registers the interface in DI with a singleton service lifetime. When injected the interface instance resolves to ContactDatabaseSetting object
            services.AddSingleton<IContactDatabaseSettings>(sp => sp.GetRequiredService<IOptions<ContactDatabaseSettings>>().Value);

            services.AddSingleton<ContactService>();

            services.AddCors(options =>
            {
                options.AddPolicy(
                    name: MyAllowSpecificOrigins,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
                    });
            });

            // this registers the NewtonsoftJson to the controllers.
            services.AddControllers()
                .AddNewtonsoftJson() ;
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            // must be after routing and before authorization
            app.UseCors(MyAllowSpecificOrigins); 
            
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
