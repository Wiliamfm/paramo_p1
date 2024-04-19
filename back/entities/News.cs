namespace paramo.entities;


public class News
{
  //TODO: See how to implements sections to make it more customizable.
  public int Id { get; set; }
  public string Title { get; set; }
  public string Content { get; set; }
  public string BannerImage {get; set;}
  public int AuthorId { get; set; }
  public string? Videos {get; set;}
  public string? Images {get; set;}
  public DateTime CreatedAt { get; set; }
  public DateTime LastModification { get; set; }


  public News(string title, string content, string bannerImage)
  {
    Title = title;
    Content = content;
    BannerImage = bannerImage;
    CreatedAt = DateTime.Now.ToUniversalTime();
  }

  public string SetVideosFromArray(string[]? videos)
  {
    if(videos == null || videos.Any() == false) return string.Empty;
    return string.Join(',', videos);
  }

  public string SetImagesFromArray(string[]? images)
  {
    if(images == null || images.Any() == false) return string.Empty;
    return string.Join(',', images);
  }
}
