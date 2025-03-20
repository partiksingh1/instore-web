import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

type Content = { title: string; description: string };
type NewsletterForm = {
  contents: Content[];
  images: FileList;
  recipients: string;
};

const languageOptions = {
  af: "Afrikaans",
  sq: "Albanian",
  am: "Amharic",
  ar: "Arabic",
  hy: "Armenian",
  az: "Azerbaijani",
  eu: "Basque",
  be: "Belarusian",
  bn: "Bengali",
  bs: "Bosnian",
  bg: "Bulgarian",
  ca: "Catalan",
  ceb: "Cebuano",
  ny: "Chichewa",
  "zh-cn": "Chinese (Simplified)",
  "zh-tw": "Chinese (Traditional)",
  co: "Corsican",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  eo: "Esperanto",
  et: "Estonian",
  tl: "Filipino",
  fi: "Finnish",
  fr: "French",
  fy: "Frisian",
  gl: "Galician",
  ka: "Georgian",
  de: "German",
  el: "Greek",
  gu: "Gujarati",
  ht: "Haitian Creole",
  ha: "Hausa",
  haw: "Hawaiian",
  iw: "Hebrew",
  hi: "Hindi",
  hmn: "Hmong",
  hu: "Hungarian",
  is: "Icelandic",
  ig: "Igbo",
  id: "Indonesian",
  ga: "Irish",
  it: "Italian",
  ja: "Japanese",
  jw: "Javanese",
  kn: "Kannada",
  kk: "Kazakh",
  km: "Khmer",
  ko: "Korean",
  ku: "Kurdish (Kurmanji)",
  ky: "Kyrgyz",
  lo: "Lao",
  la: "Latin",
  lv: "Latvian",
  lt: "Lithuanian",
  lb: "Luxembourgish",
  mk: "Macedonian",
  mg: "Malagasy",
  ms: "Malay",
  ml: "Malayalam",
  mt: "Maltese",
  mi: "Maori",
  mr: "Marathi",
  mn: "Mongolian",
  my: "Myanmar (Burmese)",
  ne: "Nepali",
  no: "Norwegian",
  or: "Odia",
  ps: "Pashto",
  fa: "Persian",
  pl: "Polish",
  pt: "Portuguese",
  pa: "Punjabi",
  ro: "Romanian",
  ru: "Russian",
  sm: "Samoan",
  gd: "Scots Gaelic",
  sr: "Serbian",
  st: "Sesotho",
  sn: "Shona",
  sd: "Sindhi",
  si: "Sinhala",
  sk: "Slovak",
  sl: "Slovenian",
  so: "Somali",
  es: "Spanish",
  su: "Sundanese",
  sw: "Swahili",
  sv: "Swedish",
  tg: "Tajik",
  ta: "Tamil",
  te: "Telugu",
  th: "Thai",
  tr: "Turkish",
  uk: "Ukrainian",
  ur: "Urdu",
  ug: "Uyghur",
  uz: "Uzbek",
  vi: "Vietnamese",
  cy: "Welsh",
  xh: "Xhosa",
  yi: "Yiddish",
  yo: "Yoruba",
  zu: "Zulu",
};

const AdminNewsLetter: React.FC = () => {
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<string>(''); // Changed to hold a single language
  const [isTranslating, setIsTranslating] = useState(false);
  const navigate = useNavigate();
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value); // Set the selected language
  };

  const { register, control, handleSubmit, reset } = useForm<NewsletterForm>({
    defaultValues: { contents: [{ title: '', description: '' }] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'contents' });

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SOME_KEY}/admin/newsletter`);
      setNewsletters(response.data);
    } catch (error) {
      toast.error('Failed to fetch newsletters.');
    }
  };

  const onSubmit = async (data: NewsletterForm) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('contents', JSON.stringify(data.contents));
      formData.append('recipients', JSON.stringify(data.recipients.split(',').map(email => email.trim())));

      if (data.images) {
        Array.from(data.images).forEach(file => formData.append('images', file));
      }

      await axios.post(`${import.meta.env.VITE_SOME_KEY}/admin/newsletter/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Newsletter created successfully!');
      fetchNewsletters();
      reset();
    } catch (error) {
      toast.error('Failed to create newsletter.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (deleteId !== null) {
      try {
        setLoading(true);
        await axios.delete(`${import.meta.env.VITE_SOME_KEY}/admin/newsletter/${deleteId}`);
        toast.success('Newsletter deleted successfully.');
        fetchNewsletters();
      } catch (error) {
        toast.error('Failed to delete newsletter.');
      } finally {
        setLoading(false);
        setIsModalOpen(false);
      }
    }
  };

  const handleSend = async (id: number) => {
    try {
      setLoading(true);
      setIsTranslating(true);
      // Step 2: Send translated content
      await axios.post(`${import.meta.env.VITE_SOME_KEY}/admin/newsletter/${id}/send`, { language, contents: newsletters.find(n => n.id === id)?.contents });
      
      toast.success('Newsletter sent successfully!');
    } catch (error) {
      toast.error('Failed to send newsletter.');
    } finally {
      setLoading(false);
      setIsTranslating(false);
    }
  };
  useEffect(() => {
    // Check if the user has the 'ADMIN' role
    const role = localStorage.getItem('role');
    if (role !== 'ADMIN') {
      // If the user is not an admin, redirect them to the login page (or any other page)
      toast.error('You are not authorized to access this page.');
      navigate('/login');
    } else {
      fetchNewsletters();
    }
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Manage Newsletters</h1>

      {/* Create Newsletter Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Create a New Newsletter</h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {fields.map((field, index) => (
            <div key={field.id} className="mb-4">
              <label className="block text-gray-700">Title {index + 1}</label>
              <input
                type="text"
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                {...register(`contents.${index}.title`, { required: true })}
              />
              <label className="block text-gray-700 mt-2">Description {index + 1}</label>
              <textarea
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                {...register(`contents.${index}.description`, { required: true })}
              />
              <button
                type="button"
                className="text-red-500 mt-2"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-blue-300 text-white p-2 rounded-lg mb-4"
            onClick={() => append({ title: '', description: '' })}
          >
            Add Content
          </button>

          <div className="mb-4">
            <label className="block text-gray-700">Images</label>
            <input
              type="file"
              multiple
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              {...register('images', { required: true })}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Recipients (comma-separated emails)</label>
            <input
              type="text"
              className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
              {...register('recipients', { required: true })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Newsletter'}
          </button>
        </form>
      </div>

      {/* Newsletter List */}
      <h2 className="text-2xl font-semibold mb-4">Newsletter List</h2>
      <div className="space-y-4">
        {newsletters.map((newsletter) => (
          <div key={newsletter.id} className="bg-white p-4 rounded-lg shadow-md">
            {newsletter.contents.map((content: Content, idx: number) => (
              <div key={idx}>
                <strong className="text-xl">{content.title}</strong>
                <p className="text-sm text-gray-600">{content.description}</p>
              </div>
            ))}
            <div className="flex flex-wrap gap-4 mt-4">
              {newsletter.images.map((img: string, idx: number) => (
                <img key={idx} src={img} alt="Newsletter" className="w-32 h-32 object-cover" />
              ))}
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => {
                  setIsModalOpen(true);
                  setDeleteId(newsletter.id);
                }}
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>

              <select
                value={language}
                onChange={handleLanguageChange}
                className="border p-2 rounded-lg w-full"
              >
                <option value="" disabled>Select a language</option>
                {Object.entries(languageOptions).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleSend(newsletter.id)}
                className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                disabled={isTranslating || loading}
              >
                {isTranslating || loading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white p-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white p-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNewsLetter;