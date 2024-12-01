// Class untuk Mercenary
class Mercenary {
  constructor(
    id,
    type,
    AttackType,
    name,
    thumb_male,
    thumb_female,
    image_male,
    image_female,
    video,
    description,
    skills
  ) {
    this.id = id;
    this.type = type;
    this.AttackType = AttackType;
    this.name = name;
    this.thumb_male = thumb_male;
    this.thumb_female = thumb_female;
    this.image_male = image_male;
    this.image_female = image_female;
    this.video = video;
    this.description = description;
    this.skills = skills; // skills adalah array objek
  }
}

// Class untuk MercenarySkills
class MercenarySkills {
  constructor(id, name, description, icon, type) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.type = type;
  }
}

// Mengekspor kedua kelas
module.exports = { Mercenary, MercenarySkills };