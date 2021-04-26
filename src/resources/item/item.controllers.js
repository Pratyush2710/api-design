// import { crudControllers } from '../../utils/crud'
import { Item } from './item.model'
import mongoose from 'mongoose'
import { connect } from '../../utils/db'

const run = async () => {
  await connect('mongodb://localhost:27017/api-test')
  const item = await Item.create({
    name: 'Clean up',
    createdBy: mongoose.Types.ObjectId(),
    list: mongoose.Types.ObjectId()
  })
  // find By ID
  console.log(await Item.findById(item._id).exec())
  // find all instances
  console.log(await Item.find().exec())

  // Note:- mongoose.find return fake promises so .exec() change to real promise
  // to avoid errors, also we can perform operation
  // like .where, .limit,.all
}
run()
// export default crudControllers(Item)
