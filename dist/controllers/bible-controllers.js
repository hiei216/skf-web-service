"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVerses = void 0;
const createVerses = async (req, res, next) => {
    //   const createdVerse = new Verse({
    //     createdAt: new Date(),
    //     participants: [
    //       {
    //         firstName: "Jirko",
    //         lastName: "Dvorak",
    //         email: "jiri.dvorak@gmx.de",
    //         verse: "This is an cool bible verse!!",
    //       },
    //     ],
    //   });
    //   try {
    //     const sess = await mongoose.startSession();
    //     sess.startTransaction();
    //     await createdVerse.save({ session: sess });
    //     await sess.commitTransaction();
    //   } catch (err) {
    //     console.log('err', err)
    //     return next(err);
    //   }
    res.status(201).json({ verses: 'no verses' });
};
exports.createVerses = createVerses;
//# sourceMappingURL=bible-controllers.js.map