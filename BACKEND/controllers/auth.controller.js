const User = require("../models/user");
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken");

// register controller
const register = async (req, res) => {
  try {
    //getting all the values from the postman
    const { userName, pasword, email ,role} = req.body;

    // If any field is missing
    if (!userName || !pasword || !email) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if user exists
    const userExistsbByEmail = await User.exists({ email: email });
    const userExistsbByUserName = await User.exists({ userName: userName });
    if (userExistsbByEmail || userExistsbByUserName) {
      return res.status(400).json({
        message: `User already exists, use a different ${
          userExistsbByEmail ? "email" : "username"
        }`,
      });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pasword, salt);

    // Save user
    await User.create({
      userName,
      pasword: hashedPassword,
      email,
      role
    });

    res.status(200).json({
      message: `${userName}, you are successfully registered in the DB`,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

// login controller
const login = async (req, res) => {
  try {
    const { pasword, email } = req.body;

    //Check if UserExist Or Not by email
    const UserPas = await User.findOne({ email });
    if (!UserPas) {
      return res.status(404).json({
        message: "This email doesn't exist in out DB,Please try existing one!!",
      });
    }

    const storedPass = await bcrypt.compare(pasword, UserPas.pasword);

    if (!storedPass) {
      return res.status(404).json({
        message: "Your password is wrong ,Please try again",
      });
    }
    //token
    const accesToken = jwt.sign(
      {
        userId: UserPas._id,
        userName: UserPas.userName,
        role: UserPas.role
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json({
      message: "Please Verify the token to continue",
      "access token": accesToken
    })
  } catch (e) {
    console.log("Unable to login due to some reasons");
    res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};


//change pasword controller
const changePasword=async (req,res)=>{
  try {
    //get the userID of the current user by jwt
    const userId= req.userInfo.userId


    //get the old and new pasword through body
    const {oldPasword,newPasword}=req.body



    //check if old and new pasword is disffrent
    if(oldPasword==newPasword)
    {
      return res.status(401).json({
        message: "Your old and new pasword can't be same"
      })
    }


    //now find the user by it's ID in DB
    const user=await User.findById(userId)


    //check if user exist's though it will be
    if(!user)
    {
      return res.status(404).json({
        message: "User not found"
      })
    }


    //to check if the old pasword is correct or not
    const isCorrectPasword=await bcrypt.compare(oldPasword,user.pasword)
    if(!isCorrectPasword)
      {
        return res.status(400).json({
          success: false,
          message: "Old pasword is wrong,please enter the valid pasword"
        })
      }


    //after the old pasword is corect ,now we need to hashthe pasword
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(newPasword,salt)

    //now the pasword is changed
    user.pasword=hashedPassword
    await user.save()
    return res.status(200).json({
      message: "Your pasword has been changed succesfuly"
    })
    
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong ,Please try again"
    })
  }


}




module.exports = { register, login,changePasword };
