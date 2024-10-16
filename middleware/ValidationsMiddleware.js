import z from 'zod'
import { BadRequestError } from '../errors/customError.js'
import { JOB_STATUS, JOB_TYPE } from '../client/src/utils/constants.js'

const withValidationErrors = (schema, source = 'body') => {
  return (
    // schema,
    (req, res, next) => {
      const dataToValidate = source === 'params' ? req.params : req.body

      const validationResult = schema.safeParse(dataToValidate)

      if (!validationResult.success) {
        // Extract only the error messages
        const errorMessages = validationResult.error.errors.map(
          (error) => error.message
        )
        console.log(errorMessages)

        throw new BadRequestError(errorMessages)
      }
      next()
    }
  )
}

const registerInputSchema = z.object({
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    })
    .trim()
    .min(2, 'name must beat lest 2 characters long'),
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    })
    .trim()
    .email('Invalid email address'),
  password: z
    .string({
      required_error: 'password is required',
      invalid_type_error: 'password must be a string',
    })
    .trim()
    .min(6, 'password must be at leats 6 characters long'),
  lastName: z
    .string({
      required_error: 'lastName is required',
      invalid_type_error: 'lastName must be a string',
    })
    .trim()
    .min(2, 'lastName must be at leats 2 characters long'),
  location: z
    .string({
      required_error: 'location is required',
      invalid_type_error: 'location must be a string',
    })
    .trim()
    .min(2, 'location must beat lest 2 characters long'),
  // role: z.enum(['user', 'admin'], {
  //   required_error: 'role is required',
  //   invalid_type_error: 'role must be a valid value',
  // }),
})

const loginInputSchema = z.object({
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    })
    .trim()
    .email('Invalid email address'),
  password: z
    .string({
      required_error: 'password is required',
      invalid_type_error: 'password must be a string',
    })
    .trim()
    .min(6, 'password must be at leats 6 characters long'),
})

export const jobSchema = z.object({
  company: z
    .string({
      required_error: 'Company Location is required',
      invalid_type_error: 'Company must be a string',
    })
    .trim()
    .min(1, 'Company must be 4 characters long'),
  position: z
    .string({
      required_error: 'Position Location is required',
      invalid_type_error: 'Position must be a string',
    })
    .trim()
    .min(1, 'Position must be 4 characters long'),
  jobLocation: z
    .string({
      required_error: 'Job Location is required',
      invalid_type_error: 'Job must be a string',
    })
    .min(1, 'Job Locationmust be 4 characters long'),
  jobStatus: z.enum(
    [JOB_STATUS.PENDING, JOB_STATUS.INTERVIEW, JOB_STATUS.DECLINED],
    {
      required_error: 'Job Status is required',
      invalid_type_error: 'Job Status must be a valid value',
    }
  ),
  jobType: z.enum(
    [JOB_TYPE.FULL_TIME, JOB_TYPE.INTERNSHIP, JOB_TYPE.PART_TIME],
    {
      required_error: 'Job Type is required',
      invalid_type_error: 'Job Type must be a valid value',
    }
  ),
})

const userInputSchema = z.object({
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string',
    })
    .trim()
    .min(2, 'name must beat lest 2 characters long'),
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    })
    .trim()
    .email('Invalid email address'),

  lastName: z
    .string({
      required_error: 'lastName is required',
      invalid_type_error: 'lastName must be a string',
    })
    .trim()
    .min(2, 'lastName must be at leats 2 characters long'),
  location: z
    .string({
      required_error: 'location is required',
      invalid_type_error: 'location must be a string',
    })
    .trim()
    .min(2, 'location must beat lest 2 characters long'),
})

const idParamsSchema = z.object({
  id: z.string().regex(/^[a-f0-9]{24}$/, {
    message: 'id must be a 24-character hexadecimal string',
  }),
})

export const validateRegisterInput = withValidationErrors(registerInputSchema)
export const validateUserInput = withValidationErrors(userInputSchema)
export const validateLoginInput = withValidationErrors(loginInputSchema)
export const validateIdParams = withValidationErrors(idParamsSchema, 'params')
export const validateCreateJob = withValidationErrors(jobSchema)
