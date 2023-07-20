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
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { runValidators: true, new: true }
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
  // Update thought
  async updateThought(req,res){
    try{
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        );
        if (!thought) {
            res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.json(thought);
    } catch (err) {
        res.status(500).json(err);
      }
  },
  //Delete thought
  async deleteThought(req,res){
    try{
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
       
        if(!thought){
            res.json(404).json({ message: 'No thoughts with that id!' });
         }

         res.json(thought);
    } catch (err) {
        res.status(500).json(err);
         
    }
  }
};
