const { response, request } = require("express");
const { Lesson, Lesson_content, Section } = require("../models");

const lessonPost = async (req = request, res = response) => {
  try {
    const { type, ovamessage, ovaside, id_section } = req.body;

    const data = {
      type,
      ovamessage,
      ovaside,
      id_section,
    };

    const lesson = new Lesson(data);

    //Guardar en DB
    await lesson.save();
    return res.json({
      msg: "Lesson creado con exito",
    });
  } catch (error) {
    console.log(error);
    return res.status(401);
  }
};

const lessonGet = async (req = request, res = response) => {
  try {
    const lessons = await Lesson.find({}).populate("id_Section");

    return res.json(lessons);
  } catch (error) {
    console.log(error);
    return res.status(401);
  }
};

const lessonGetById = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findById(id).populate("id_section");
    if (!lesson) {
      return res.json({
        msg: `No se encuentra la lesson id:${id} en la db`,
      });
    }
    return res.json(lesson);
  } catch (error) {
    console.log(error);
    return res.status(401);
  }
};
const lessonGetByIdSection = async (req = request, res = response) => {
  try {
    const { idSection } = req.params;
    const lesson = await Lesson.find({ id_section: idSection }).populate(
      "id_section"
    );
    if (!lesson) {
      return res.json({
        msg: `No se encuentra la lesson id:${id} en la db`,
      });
    }
    return res.json(lesson);
  } catch (error) {
    console.log(error);
    return res.status(401);
  }
};

const lessonAndLessonContentGetByIdSection = async (
  req = request,
  res = response
) => {
  try {
    const { idSection } = req.params;

    const section = await Section.findById(idSection);

    const lesson = await Lesson.find({ id_section: idSection });

    let lessonContent = [];

    await Promise.all(
      lesson.map(async (e, index) => {
        let content = await Lesson_content.find({ id_lesson: e._id });
        lessonContent.push(content);
      })
    );
    let lessons = [];
    await Promise.all(
      lessonContent.map(async (e, index) => {
        console.log(e[0]);
        let lessonById = await Lesson.findById(e[0].id_lesson);
        lessons.unshift(lessonById);
        lessonContent[index].unshift({ lesson: lessonById });
      })
    );

    console.log("lessonContent");
    console.log(lessonContent.sort());

    if (!lesson) {
      return res.json({
        msg: `No se encuentra la lesson id:${id} en la db`,
      });
    }

    /*  return res.json({ section: section, lessonContent: lessonContent }); */
    return res.json({
      section: section,
      lessonContentResult: [
        lessonContent.map((lesson, index) => ({
          lesson: lesson[0].lesson,
          content: lesson.slice(1),
        })),
      ],
    });
  } catch (error) {
    console.log(error);
    return res.status(401);
  }
};

const lessonPut = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findById(id);

    if (!lesson) {
      return res.json({
        msg: `El section ${id} no no se encuentra en la db`,
      });
    }
    const { type, ovamessage, ovaside, id_section } = req.body;

    const data = {
      type,
      ovamessage,
      ovaside,
      id_section,
    };

    await Lesson.findByIdAndUpdate(id, data);
    console.log(data);
    return res.json({
      msg: "La section ha sido cambiado con exito",
    });
  } catch (error) {
    console.log(error);
    return res.status(401);
  }
};

const lessonDelete = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findById(id);
    if (!lesson) {
      return res.status(400).json({
        msg: "la lesson no existe en la db",
      });
    }
    //Convertimos el estado del usuario en false
    await Lesson.findByIdAndDelete(id);

    return res.json({
      msg: "usuario borrado con exito",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  lessonGet,
  lessonGetById,
  lessonPut,
  lessonDelete,
  lessonGetByIdSection,
  lessonAndLessonContentGetByIdSection,
  lessonPost,
};
