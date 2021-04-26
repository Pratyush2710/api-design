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

  // update
  const updated = await Item.findByIdAndUpdate(
    item._id,
    { name: 'Pratyush Garg' },
    { new: true }
    // new:true return updated object, otherwise previous object
  ).exec()
  console.log(updated)

  // Remove
  const removed = await Item.findByIdAndRemove(item._id).exec()
  // new:true return updated object, otherwise previous object

  console.log(removed)
}
run()
// export default crudControllers(Item)
