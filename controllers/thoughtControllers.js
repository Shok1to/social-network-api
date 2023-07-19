const { User, Thought } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single comment
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that id' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a comment
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const post = await Post.findOneAndUpdate(
        { _id: req.body.postId },
        { $push: { comments: comment._id } },
        { new: true }
      );

      if (!post) {
        return res
          .status(404)
          .json({ message: 'comment created, but no posts with this ID' });
      }

      res.json({ message: 'comment created' });
    } catch (err) {
      console.error(err);
    }
  },
};
