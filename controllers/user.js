exports.getUser = async (req, res) => {
  try {
    const foundUser = await User.findById(req.userId);
    res.status(200).json(foundUser);
  } catch (error) {
    res.status(500).json({ message: 'Interval server error!' });
  }
};