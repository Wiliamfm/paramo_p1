using Microsoft.EntityFrameworkCore;
using paramo.database;
using paramo.entities;
using paramo.entities.inputs;
using LoginInput = paramo.entities.inputs.LoginInput;

var builder = WebApplication.CreateBuilder(args);
//TODO: Move this to a config file.
builder.Services.AddDbContext<ParamoDbContext>(options =>
{
  options.UseSqlite("Data Source=paramo.db");
});
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
  //TODO: Check this.
  app.UseExceptionHandler("/Error");
  app.UseHsts();
}
else
{
  app.UseDeveloperExceptionPage();
  app.UseMigrationsEndPoint();
}

app.MapPost("/login", Login);

var newsGroup = app.MapGroup("/news");

//TODO: Move methods to services.
newsGroup.MapPost("/", Create);
newsGroup.MapPut("/", Update);
app.Run();


static IResult Login(HttpContext ctx, LoginInput input)
{
  //TODO: Create JWT and save it in memory.
  if(input.Email != "admin@test.com")
  {
    return Results.NotFound();
  }
  var token = "test-token";
  ctx.Response.Cookies.Append("access_token", token, new CookieOptions
  {
    HttpOnly = true,
    SameSite = SameSiteMode.Strict,
    Secure = true
  });
  return Results.Ok();
}

static async Task<IResult> Create(NewsInput input, ParamoDbContext db)
{
  //TODO: Cleanup inputs.
  var news = await db.News.Where(n => n.Title == input.Title).FirstOrDefaultAsync();
  if(news != null)
  {
    return TypedResults.BadRequest("Title already exists.");
  }
  if(string.IsNullOrEmpty(input.Title) || string.IsNullOrEmpty(input.Content) || string.IsNullOrEmpty(input.BannerImage))
  {
    return TypedResults.BadRequest();
  }
  News newNews = new(title: input.Title, content: input.Content, bannerImage: input.BannerImage);
  newNews.Videos = newNews.SetVideosFromArray(input.Videos);
  newNews.Images = newNews.SetImagesFromArray(input.Images);
  db.News.Add(newNews);
  await db.SaveChangesAsync();
  return TypedResults.Created($"/news/{newNews.Id}", newNews);
}

static IResult Update(NewsInput input)
{
  //TODO: Use typedReults.
  //TODO: CALL DB TO ACTUALLY GET NEW.
  if(false){
    return Results.NotFound();
  }
  var newToUpdate = new News("TO UPDATE","TO UPDATE","TO UPDATE");
  newToUpdate.Title = input.Title ?? newToUpdate.Title;
  newToUpdate.Content = input.Content ?? newToUpdate.Content;
  newToUpdate.BannerImage = input.BannerImage ?? newToUpdate.BannerImage;
  newToUpdate.Videos = newToUpdate.SetVideosFromArray(input.Videos);
  newToUpdate.Images = newToUpdate.SetImagesFromArray(input.Images);
  //TODO: UPDATE IN DB
  return Results.Ok(newToUpdate);
}

