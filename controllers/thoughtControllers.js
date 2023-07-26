const { User, Thought } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single thought
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
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update thought
  async updateThought(req,res){
    try{
        const updateThought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        );
        if (!updateThought) {
            res.status(404).json({ message: 'No thought with this id!' });
          }
    
          res.status(200).json(updateThought);
    } catch (err) {
        res.status(500).json(err);
    }
  },

  //Delete thought
  async deleteThought(req,res){
    try{
        const deleteThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if (!deleteThought) {
            res.status(404).json({ message: 'No thought with this id!' });
          }
            
          res.status(200).json(deleteThought);
        } catch (err) {
          res.status(500).json(err);
        }
    },
  
  //Add reaction
  async addReaction(req, res) {
    try {
      
      // const thought = await Thought.findOneAndUpdate(
      //   { _id: req.params.thoughtId },
      //   { $addToSet: { reactions: req.body.reactionBody } },
      //   { runValidators: true, new: true }
      // );
      const thought = await Thought.findOneAndUpdate(
    
        { _id: req.params.thoughtId },
        {
            $push: {
                reactions: req.body
            }
        },
        { new: true }
    )
      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Delete reaction
  async removeReaction(req,res){
    try{
        const removeReaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )

        if (!removeReaction) {
            res.status(404).json({ message: 'No reaction with this id!' });
          }
            
          res.status(200).json(removeReaction);
        } catch (err) {
          res.status(500).json(err);
        }
         
    }
};
