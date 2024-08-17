const db = require('../../db-config')


const checkSchemeId = async (req, res, next) => {
  try{
    const exisitng = await db('schemes')
      .where('scheme_id', req.params.scheme_id)
      .first()

  if(!exisitng){
    next({
      status: 404, 
      message: `scheme with scheme_id ${req.params.scheme_id} not found`
    })
  }else{
    next()
  }
}catch(err){
  next(err)
}
  
 }


const validateScheme = (req, res, next) => {
  const {scheme_name} = req.body

  if(!scheme_name || typeof(scheme_name) !== 'string'){
    next({status: 400, message: 'invalid scheme_name'})
  }else{
    next()
  }
}


const validateStep = (req, res, next) => {
  const {step_number, instructions} = req.body;

  if((!instructions ||
     typeof(instructions) !== 'string') ||
      (typeof(step_number) !== 'number' || 
      step_number < 1
      )){
        next({status: 400, message: 'invalid step'})
      }
      else{
        next()
      }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}