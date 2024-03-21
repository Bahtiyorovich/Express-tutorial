export const createPupilValidationSchema = {
  id:{
    isLength:{
      options: {
        min: 1,
        max: 50
      }
    },
    notEmpty: {
      errorMessage: "ID cannot be empty"
    },
    isString: {
      errorMessage: "ID must be a string"
    },
  },
  pupil: {
    isLength: {
      options: {
        min: 5,
        max: 32
      },
      errorMessage: "Pupil name must be at least 5 characters with a max of 32 characters",
    },
    notEmpty: {
      errorMessage: "Pupil name cannot be empty",
    },
    isString: {
      errorMessage: "Pupil name must be a string"
    }
  },
  coin: {
    isInt: {
      options: {
        max: 10000
      },
      errorMessage: "Pupil name must be at least 10 score"
    },
    notEmpty: false,
  }
}


