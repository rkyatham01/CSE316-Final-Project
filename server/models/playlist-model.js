const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        likes:{ type:[String], required:true},
        dislikes:{ type:[String], required:true},
        listens:{type: Number, required: true},
        username:{type:String, required:true},

        comments:{ type:[{
            user: String,
            comment : String
        }], required:true},

        // publish:{ type:[{
        //     boolean : 
        //     data :
        // ]}

        }
    
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true }
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
