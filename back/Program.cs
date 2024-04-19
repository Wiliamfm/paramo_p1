using paramo.entities;
using paramo.entities.inputs;
using LoginInput = paramo.entities.inputs.LoginInput;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/login", Login);

var newsGroup = app.MapGroup("/news");

newsGroup.MapPost("/", Create);
newsGroup.MapPut("/", Update);
app.Run();


static IResult Login(LoginInput input)
{
  //TODO: Create JWT and save it in memory.
  if(input.Email != "admin@test.com")
  {
    return Results.NotFound();
  }
  var token = "secret-token";
  return Results.Ok(token);
}

static IResult Create(NewsInput input)
{
  var videos = "";
  var images = "";
  if(string.IsNullOrEmpty(input.Title) || string.IsNullOrEmpty(input.Content) || string.IsNullOrEmpty(input.BannerImage))
  {
    return Results.BadRequest();
  }
  if(input.Videos != null && input.Videos.Any())
  {
    videos = string.Join(", ", input.Videos);
  }
  if(input.Images != null && input.Images.Any())
  {
    images = string.Join(",", input.Images);
  }
  News newNew = new(title: input.Title, content: input.Content, bannerImage: input.BannerImage);
  newNew.Videos = videos;
  newNew.Images = images;
  //TODO: CALL LDB TO ACTUALLY CREATE NEW
  newNew.Id = new Random().Next(1, 100);
  return Results.Created($"/news/{newNew.Id}", newNew);
}

static IResult Update(NewsInput input)
{
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

