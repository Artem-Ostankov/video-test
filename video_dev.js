// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Videos = new Meteor.Collection("videos");

if (Meteor.isClient) {
  Template.dummy_videos_templ.videos = function () {
    return Videos.find({}, {sort: {title: 1, url: -1}});
  };

  Template.dummy_videos_templ.selected_name = function () {
    var video = Videos.findOne(Session.get("selected_player"));
    return video && video.title;
  };

  Template.video_feed.selected = function () {
    return Session.equals("selected_player", this._id) ? "selected" : '';
  };

  Template.dummy_videos_templ.events({
    'click input.inc': function () {
      // Videos.update(Session.get("selected_player"), {$inc: {score: 5}});
    }
  });

  Template.video_feed.events({
    'click': function () {
      Session.set("selected_player", this._id);
    }
  });
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Videos.find().count() === 0) {
      Videos.insert({ url: "http://video-js.zencoder.com/oceans-clip.mp4", title: "Ocean", status: "closed"});
      Videos.insert({ url: "http://video-js.zencoder.com/big_buck_bunny.mp4", title: "Big Bunny", status : "betted"});
      Videos.insert({ url: "http://video-js.zencoder.com/sintel.mp4", title: "Sintel", status: "open"});
    }
  });
}
