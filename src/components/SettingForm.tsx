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

const formSchema = z.object({
  settingName: z.string().min(2).max(50),
  essentialKeyword: z.string().max(50),
  formatCategory: z.string({required_error: "원하는 유형을 선택해주세요"}),
  difficultyLevel: z.number().array()
})

export function SettingForm(props: {id: number}) {
  const { addSetting, setSetting, changeSetting } = useContexts();
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      settingName: "",
      essentialKeyword: "",
      formatCategory: "뉴스",
      difficultyLevel: [50],
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const settingStruct = {name: values.settingName, keywords: [values.essentialKeyword], format: values.formatCategory, li: values.difficultyLevel[0], custom: false};
    if(props.id === 0) {
      const sret = addSetting(settingStruct);
      if(sret !== null) setSetting(sret.id);
    } else {
      const sret = changeSetting(settingStruct, props.id);
      if(sret !== null) setSetting(sret.id);
    }
    navigate("/")
  }

  return (
    <div>
      <span className='textViewTitle'>
        설정 편집
      </span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="settingName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='textSubTitle'>이름</FormLabel>
                <FormDescription className='textSubDescription'>
                  설정을 구분하기 위한 이름입니다.
                </FormDescription>
                <FormControl>
                  <Input placeholder={"ex. 새로운 설정"} {...field} />
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
                <FormLabel className='textSubTitle'>필수 키워드</FormLabel>
                <FormDescription className='textSubDescription'>
                  지문에 반드시 포함되어야 할 키워드들입니다. 관심있는 단어들을 추가해 보세요.
                </FormDescription>
                <FormControl>
                  <Input placeholder="ex. 인공지능" {...field} />
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
                <FormLabel className='textSubTitle'>유형/형식</FormLabel>
                <FormDescription className='textSubDescription'>
                  지문의 형식을 지정합니다. 읽고 싶은 글의 형식을 선택하세요.
                </FormDescription>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="news">뉴스</SelectItem>
                    <SelectItem value="fiction">소설</SelectItem>
                    <SelectItem value="academicPaper">논문</SelectItem>
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
              <FormItem>
                <FormLabel className='textSubTitle'>지문 난이도</FormLabel>
                <FormDescription className='textSubDescription'>
                  생성되는 지문의 읽기 난이도를 설정합니다. 난이도는 Lexile measures를 통해 평가됩니다.
                </FormDescription>
                <Slider onValueChange={field.onChange} defaultValue={field.value} max={100} step={1} />
                <FormMessage />
              </FormItem>
            )}
            />
          <div>
            <Label className='textSubTitle'>미리보기</Label>
            <Textarea className='resize-none'></Textarea>
          </div>
          <div className='formButtonContainer'>
            <Button className="formButton" type="submit">저장</Button>
            <Button className="formButton" variant="secondary" onClick={() => navigate("/")}>취소</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}