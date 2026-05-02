export const sample_field_types_en = [
  // {
  //   "field_name": "progress_report4",
  //   "form_name": "progress_report_4",
  //   "section_header": "",
  //   "field_type": "descriptive",
  //   "field_label": "Congratulations! You have completed the final week of our Mobile Measures Month. Thank you for participating. We just have some final questions about your experience with our mobile measures system. These will be available for you to answer for the next week.",
  //   "select_choices_or_calculations": "",
  //   "field_note": "",
  //   "text_validation_type_or_show_slider_number": "",
  //   "text_validation_min": "",
  //   "text_validation_max": "",
  //   "identifier": "",
  //   "branching_logic": "",
  //   "required_field": "",
  //   "custom_alignment": "",
  //   "question_number": "",
  //   "matrix_group_name": "",
  //   "matrix_ranking": "",
  //   "field_annotation": "",
  //   "evaluated_logic": ""
  // },
  {
    "field_name": "phq8_1",
    "form_name": "phq8",
    "section_header": "Over the past two weeks, how often have you been bothered by any of the following problems ",
    "field_type": "radio",
    "field_label": "1. Little interest or pleasure in doing things?",
    "select_choices_or_calculations": [
      {
        "code": "0",
        "label": "Not at all "
      },
      {
        "code": "1",
        "label": "Several days "
      },
      {
        "code": "2",
        "label": "More than half the days "
      },
      {
        "code": "3",
        "label": "Nearly every day"
      }
    ],
    "field_note": "",
    "text_validation_type_or_show_slider_number": "",
    "text_validation_min": "",
    "text_validation_max": "",
    "identifier": "",
    "branching_logic": "",
    "required_field": "",
    "custom_alignment": "",
    "question_number": "",
    "matrix_group_name": "phq8",
    "matrix_ranking": "",
    "field_annotation": "",
    "evaluated_logic": ""
  },
  {
    "field_name": "esm_content",
    "form_name": "esm",
    "section_header": "",
    "field_type": "range",
    "field_label": "Right now, I feel content",
    "select_choices_or_calculations": [
      {
        "code": "1",
        "label": "1 Not at all"
      },
      {
        "code": "2",
        "label": "2"
      },
      {
        "code": "3",
        "label": "3"
      },
      {
        "code": "4",
        "label": "4"
      },
      {
        "code": "5",
        "label": "5"
      },
      {
        "code": "6",
        "label": "6"
      },
      {
        "code": "7",
        "label": "7 Very much"
      }
    ],
    "field_note": "",
    "text_validation_type_or_show_slider_number": "",
    "text_validation_min": "",
    "text_validation_max": "",
    "identifier": "",
    "branching_logic": "",
    "required_field": "",
    "custom_alignment": "",
    "question_number": "",
    "matrix_group_name": "esm1",
    "matrix_ranking": "",
    "field_annotation": "",
    "evaluated_logic": ""
  },
  {
    "field_name": "esm_slider_content",
    "form_name": "esm",
    "section_header": "",
    "field_type": "slider",
    "field_label": "Right now, I feel content",
    "range": {
      "min": "1",
      "max": "10",
      "step": "1"
    },
    "field_note": "",
    "text_validation_type_or_show_slider_number": "",
    "text_validation_min": "",
    "text_validation_max": "",
    "identifier": "",
    "branching_logic": "",
    "required_field": "",
    "custom_alignment": "",
    "question_number": "",
    "matrix_group_name": "esm1",
    "matrix_ranking": "",
    "field_annotation": "",
    "evaluated_logic": ""
  },
  {
    "field_name": "esm_social_interact",
    "form_name": "esm",
    "section_header": "",
    "field_type": "checkbox",
    "field_label": "Who am I with?",
    "select_choices_or_calculations": [
      {
        "code": "0",
        "label": "Alone"
      },
      {
        "code": "1",
        "label": "Partner"
      },
      {
        "code": "2",
        "label": "Relatives living with you"
      },
      {
        "code": "3",
        "label": "Relatives not living with you"
      },
      {
        "code": "4",
        "label": "House/roomates"
      },
      {
        "code": "5",
        "label": "Friends"
      },
      {
        "code": "6",
        "label": "Classmates/colleagues"
      },
      {
        "code": "7",
        "label": "Caregiver"
      },
      {
        "code": "8",
        "label": "Strangers/others"
      }
    ],
    "field_note": "By residents we mean persons who are living in the same house/apartment",
    "text_validation_type_or_show_slider_number": "",
    "text_validation_min": "",
    "text_validation_max": "",
    "identifier": "",
    "branching_logic": "",
    "required_field": "",
    "custom_alignment": "",
    "question_number": "",
    "matrix_group_name": "",
    "matrix_ranking": "",
    "field_annotation": "",
    "evaluated_logic": ""
  },
  {
    "field_name": "audio_1",
    "form_name": "audio",
    "section_header": "Speech test",
    "field_type": "info",
    "field_label": "Read this carefully!",
    "select_choices_or_calculations": [
      {
        "label": "Make yourself comfortable, and find a quiet space.",
        "code": "Step 1"
      },
      {
        "label": "The next screen will show you a short paragraph to read aloud. The app will record your voice while you do so.",
        "code": "Part 2"
      },
      {
        "label": "Click 'next' to get started",
        "code": "Part 3"
      }
    ],
    "field_note": "",
    "text_validation_type_or_show_slider_number": "",
    "text_validation_min": "",
    "text_validation_max": "",
    "identifier": "",
    "branching_logic": "",
    "required_field": "",
    "custom_alignment": "",
    "question_number": "",
    "matrix_group_name": "audio",
    "matrix_ranking": "",
    "field_annotation": "",
    "evaluated_logic": ""
  },
  // {
  //   "field_name": "audio_2",
  //   "form_name": "audio",
  //   "section_header": "Speech test",
  //   "field_type": "audio",
  //   "field_label": "",
  //   "select_choices_or_calculations": [
  //     {
  //       "label": "Go placidly amid the noise and haste, and remember what peace there may be in silence. As far as possible, without surrender, be on good terms with all persons. Speak your truth quietly and clearly; and listen to others, even to the dull and ignorant; they too have their story.",
  //       "code": "P1"
  //     },
  //     {
  //       "label": "Avoid loud and aggressive persons, they are vexations to the spirit. If you compare yourself with others, you may become vain and bitter, for always there will be greater and lesser persons than yourself. Enjoy your achievements as well as your plans.",
  //       "code": "P2"
  //     },
  //     {
  //       "label": "Keep interested in your own career, however humble; it is a real possession in the changing fortunes of time. Exercise caution in your business affairs, for the world is full of trickery. But let this not blind you to what virtue there is; many persons strive for high ideals, and everywhere life is full of heroism.",
  //       "code": "P3"
  //     }
  //   ],
  //   "field_note": "",
  //   "text_validation_type_or_show_slider_number": "",
  //   "text_validation_min": "",
  //   "text_validation_max": "",
  //   "identifier": "",
  //   "branching_logic": "",
  //   "required_field": "",
  //   "custom_alignment": "",
  //   "question_number": "",
  //   "matrix_group_name": "audio",
  //   "matrix_ranking": "",
  //   "field_annotation": "",
  //   "evaluated_logic": ""
  // },
  // {
  //   "field_name": "2MW_test_2",
  //   "form_name": "2MW_test",
  //   "section_header": "2MW Test",
  //   "field_type": "timed",
  //   "field_label": "Start walking back and forth.",
  //   "select_choices_or_calculations": [],
  //   "field_note": "",
  //   "text_validation_type_or_show_slider_number": "",
  //   "text_validation_min": "",
  //   "text_validation_max": "",
  //   "identifier": "",
  //   "branching_logic": "",
  //   "required_field": "",
  //   "custom_alignment": "",
  //   "question_number": "",
  //   "matrix_group_name": "2MW",
  //   "matrix_ranking": "",
  //   "field_annotation": {
  //     "image": "assets/imgs/2MWT_walking.png",
  //     "timer": {
  //       "start": 10,
  //       "end": 0
  //     },
  //     "unit": "sec"
  //   },
  //   "evaluated_logic": ""
  // },
  {
      "field_name": "text_plain",
      "form_name": "plain_text_test",
      "section_header": "",
      "field_type": "text",
      "field_label": "Enter any free text.",
      "select_choices_or_calculations": "",
      "field_note": "",
      "text_validation_type_or_show_slider_number": "",
      "text_validation_min": "",
      "text_validation_max": "",
      "identifier": "",
      "branching_logic": "",
      "required_field": "",
      "custom_alignment": "",
      "question_number": "",
      "matrix_group_name": "",
      "matrix_ranking": "",
      "field_annotation": "",
      "evaluated_logic": ""
  },
  {
    "field_name": "date_of_birth",
    "section_header": "",
    "field_type": "text",
    "field_label": "Enter your date of birth.",
    "select_choices_or_calculations": "",
    "field_note": "",
    "text_validation_type_or_show_slider_number": "date_dmy",
    "text_validation_min": "",
    "text_validation_max": "",
    "identifier": "",
    "branching_logic": "",
    "required_field": "",
    "custom_alignment": "",
    "question_number": "",
    "matrix_group_name": "",
    "matrix_ranking": "",
    "field_annotation": "",
    "evaluated_logic": ""
  },
  {
    "field_name": "sample_duration",
    "section_header": "",
    "field_type": "text",
    "field_label": "Enter the time interval.",
    "select_choices_or_calculations": "",
    "field_note": "",
    "text_validation_type_or_show_slider_number": "duration",
    "text_validation_min": "",
    "text_validation_max": "",
    "identifier": "",
    "branching_logic": "",
    "required_field": "",
    "custom_alignment": "",
    "question_number": "",
    "matrix_group_name": "",
    "matrix_ranking": "",
    "field_annotation": "",
    "evaluated_logic": ""
  },
  {
    "field_name": "sample_time",
    "section_header": "",
    "field_type": "text",
    "field_label": "Enter the time.",
    "select_choices_or_calculations": "",
    "field_note": "",
    "text_validation_type_or_show_slider_number": "time",
    "text_validation_min": "",
    "text_validation_max": "",
    "identifier": "",
    "branching_logic": "",
    "required_field": "",
    "custom_alignment": "",
    "question_number": "",
    "matrix_group_name": "",
    "matrix_ranking": "",
    "field_annotation": "",
    "evaluated_logic": ""
  },
  {
    "field_name": "sample_date_time",
    "section_header": "",
    "field_type": "text",
    "field_label": "Enter the date and time.",
    "select_choices_or_calculations": "",
    "field_note": "",
    "text_validation_type_or_show_slider_number": "datetime_dmy",
    "text_validation_min": "",
    "text_validation_max": "",
    "identifier": "",
    "branching_logic": "",
    "required_field": "",
    "custom_alignment": "",
    "question_number": "",
    "matrix_group_name": "",
    "matrix_ranking": "",
    "field_annotation": "",
    "evaluated_logic": ""
  },
  {
    "field_name": "sample_number",
    "section_header": "",
    "field_type": "text",
    "field_label": "Enter the number.",
    "select_choices_or_calculations": "",
    "field_note": "",
    "text_validation_type_or_show_slider_number": "number",
    "text_validation_min": "1",
    "text_validation_max": "10",
    "identifier": "",
    "branching_logic": "",
    "required_field": "",
    "custom_alignment": "",
    "question_number": "",
    "matrix_group_name": "",
    "matrix_ranking": "",
    "field_annotation": "",
    "evaluated_logic": ""
  },
  {
    "field_name": "pdds",
    "form_name": "patient_determined_disease_step",
    "section_header": "Instructions: Please read the choices listed below and choose the one that best describes your own situation. This scale focuses mainly on how well you walk. You might not find a description that reflects your condition exactly, but please mark the one category that describes your situation the closest.",
    "field_type": "range-info",
    "field_label": "Which category describes your walking situation closest?",
    "select_choices_or_calculations": [
      {
        "code": "0",
        "label": "<B>Normal:</B> I may have some mild symptoms, mostly sensory due to MS but they do not limit my activity. If I do have an attack, I return to normal when the attack has passed. "
      },
      {
        "code": "1",
        "label": "<B>Mild Disability:</B> I have some noticeable symptoms from my MS but they are minor and have only a small effect on my lifestyle. "
      },
      {
        "code": "2",
        "label": "<B>Moderate Disability:</B> I do not have any limitations in my walking ability. However, I do have significant problems due to MS that limit daily activities in other ways. "
      },
      {
        "code": "3",
        "label": "<B>Gait Disability:</B> MS does interfere with my activities, especially my walking. I can work a full day, but athletic or physically demanding activities are more difficult than they used to be. I usually do not need a cane or other assistance to walk, but I might need some assistance during an attack. "
      },
      {
        "code": "4",
        "label": "<B>Early Cane:</B> I use a cane or a single crutch or some other form of support (such as touching a wall or leaning on someones arm) for walking all the time or part of the time, especially when walking outside. I think I can walk 25 feet in 20 seconds without a cane or crutch. I always need some assistance (cane or crutch) if I want to walk as far as 3 blocks. "
      },
      {
        "code": "5",
        "label": "<B>Late Cane:</B> To be able to walk 25 feet, I have to have a cane, crutch or someone to hold onto. I can get around the house or other buildings by holding onto furniture or touching the wallsfor support. I may use a scooter or wheelchair if I want to go greater distances. "
      },
      {
        "code": "6",
        "label": "<B>Bilateral Support:</B> To be able to walk as far as 25 feet I must have 2 canes or crutches or a walker. I may use a scooter or wheelchair for longer distances. "
      },
      {
        "code": "7",
        "label": "<B>Wheelchair / Scooter:</B> My main form of mobility is a wheelchair. I may be able to stand and/or take one or two steps, but I cannot walk 25 feet, even with crutches or a walker. "
      },
      {
        "code": "8",
        "label": "<B>Bedridden:</B> Unable to sit in a wheelchair for more than one hour"
      }
    ],
    "field_note": "",
    "text_validation_type_or_show_slider_number": "",
    "text_validation_min": "",
    "text_validation_max": "",
    "identifier": "",
    "branching_logic": "",
    "required_field": "",
    "custom_alignment": "",
    "question_number": "",
    "matrix_group_name": "pdds",
    "matrix_ranking": "y",
    "field_annotation": "range-info-type",
    "evaluated_logic": ""
  },
  {
    "field_name": "lipf_stairs",
    "form_name": "lipf",
    "section_header": "",
    "field_type": "yesno",
    "field_label": "Did you walk up one flight of stairs in the last 24 hours?",
    "select_choices_or_calculations": "",
    "field_note": "",
    "text_validation_type_or_show_slider_number": "",
    "text_validation_min": "",
    "text_validation_max": "",
    "identifier": "",
    "branching_logic": "",
    "required_field": "y",
    "custom_alignment": "",
    "question_number": "",
    "matrix_group_name": "",
    "matrix_ranking": "",
    "field_annotation": "",
    "evaluated_logic": ""
  },
]
