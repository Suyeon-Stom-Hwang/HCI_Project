import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import './css/shadcn.css'
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from '@radix-ui/react-label'
import { useContexts } from "@/Contexts"
import { useNavigate } from "react-router-dom"
import './css/SettingForm.css'

const liValues = [100, 300, 500, 700, 900, 1100, 1500];
const liDescriptions = [
  "원어민 유아/유치부", 
  "원어민 7세", 
  "원어민 8세", 
  "원어민 9 ~ 10세", 
  "원어민 11 ~ 13세", 
  "원어민 14 ~ 16세", 
  "원어민 17세 ~ 성인"];
const liExamples = [
  "A new AI software helps people. The computer uses big data and natural language processing.", 
  "In schools today, new technologies are changing the way students learn. One important technology is artificial intelligence.",
  "One of these areas is artificial intelligence, known as AI. AI is the ability of a computer to think and learn like a human. Another important topic is deep learning.",
  "Recent developments in computer science have led to significant breakthroughs in the field of AI, particularly in how machines process and understand language. One of the key developments in AI is deep learning, a subset of machine learning.", 
  "The field encompasses various aspects such as machine learning, language processing, and neural networks, which are transforming the way we live and work. With the power of algorithms, computer can now perform tasks that were once thought only possible for humans.", 
  "In recent years, the field of artificial Intelligence has seen remarkable progress, transforming various sectors ranging from healthcare to finance. One of the most significant areas that AI is impacting is Human-Computer Interaction, fundamentally altering the way humans and machines communicate and collaborate.", 
  "The rise of artificial intelligence (AI) in recent years has brought transformative changes to various fields, including natural language processing (NLP). This branch of AI focuses on the interaction between computers and humans using natural language, leading to the development of increasingly sophisticated algorithms."
];

const formSchema = z.object({
  settingName: z.string().min(2).max(50),
  essentialKeyword: z.string().max(50),
  formatCategory: z.string({required_error: "원하는 유형을 선택해주세요"}),
  difficultyLevel: z.number().array()
})

export function SettingForm(props: {id: number}) {
  const { addSetting, changeSetting, currentSetting, getPredefinedFormats } = useContexts();
  const navigate = useNavigate();

  const curSet = currentSetting();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      settingName: (props.id === 0 || curSet === null)?"":curSet.name,
      essentialKeyword: (props.id === 0 || curSet === null)?"":curSet.keywords.join(", "),
      formatCategory: (props.id === 0 || curSet === null)?"news":curSet.format,
      difficultyLevel: (props.id === 0 || curSet === null)?[Math.floor(liValues.length / 2)]:[liValues.indexOf(curSet.li)],
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const settingStruct = {name: values.settingName, keywords: values.essentialKeyword.split(",").map(x => x.trim()), format: values.formatCategory, li: liValues[values.difficultyLevel[0]], custom: false};
    if(props.id === 0) {
      addSetting(settingStruct);
    } else {
      changeSetting(settingStruct, props.id);
    }
    navigate("/")
  }

  return (
    <div>
      <div className='textViewTitle mb-[20px]'>
        설정 편집
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="settingName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[16px] font-bold'>이름</FormLabel>
                <FormDescription>
                  설정을 구분하기 위한 이름입니다.
                </FormDescription>
                <FormControl>
                  <Input 
                    placeholder={(props.id===0 || curSet === null)?"ex. 새로운 설정":""}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="essentialKeyword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[16px] font-bold'>필수 키워드</FormLabel>
                <FormDescription>
                  지문에 반드시 포함되어야 할 키워드들입니다. 관심있는 단어들을 추가해 보세요. 여러 개의 키워드를 추가할 때에는 쉼표로 구분합니다.
                </FormDescription>
                <FormControl>
                  <Input
                    placeholder={(props.id === 0 || curSet === null)?"ex. 인공지능, 컴퓨터":""}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="formatCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-[16px] font-bold'>유형/형식</FormLabel>
                <FormDescription>
                  지문의 형식을 지정합니다. 읽고 싶은 글의 형식을 선택하세요.
                </FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={field.value}/>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                  {
                    getPredefinedFormats().map((entry) => (
                      <SelectItem value={entry.formatEN}>{entry.formatKR}</SelectItem>
                    ))
                  }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
            />
          <FormField
            control={form.control}
            name="difficultyLevel"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel className='text-[16px] font-bold'>지문 난이도</FormLabel>
                  <FormDescription>
                    생성되는 지문의 읽기 난이도를 설정합니다. 난이도는 Lexile measures를 통해 평가됩니다.
                  </FormDescription>
                  <Slider onValueChange={field.onChange} defaultValue={field.value} min={0} max={liValues.length - 1} step={1} />
                  <FormMessage />
                </FormItem>
                <div className="space-y-1">
                  <Label className='text-[16px] font-bold'>미리보기</Label>
                  <FormDescription> 현재 난이도 - { liDescriptions[field.value[0]] } 수준 </FormDescription>
                  <article className="text-wrap h-[145px] p-[8px] border-[1px] border-inherit rounded-md">
                    {liExamples[field.value[0]]}
                  </article>
                </div>
              </>
            )}
            />
          <div className='formButtonContainer'>
            <Button className="formButton" type="submit">저장</Button>
            <Button className="formButton" variant="secondary" onClick={() => navigate("/")}>취소</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}