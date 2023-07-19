import { EmpytMemories } from '@/components/EmptyMemories'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'
import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import Image from 'next/image'
import { ArrowRight, Link } from 'lucide-react'
import UpdateMemory from './memories/especific/page'

dayjs.locale(ptBr)

interface Memory{
  id: string,
  coverUrl: string,
  excerpt: string,
  createdAt: string,
}

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if(!isAuthenticated){
    return  <EmpytMemories />
  }

  const token = cookies().get('token')?.value
  const response = await api.get('/memories', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })

  const memories: Memory[] = response.data

  if(memories.length === 0){
    return  <EmpytMemories />
  }

  function handleClick (event: any){
    console.log(event)
    // const hitory = useHistory()
    // const coverUrl = memory.CoverUrl
  }

  return(
    <div className="flex flex-col gap-10 p-8">
      {memories.map(memory => {
        return (
          <div key={memory.id} className="space-y-4">
            <time 
              className="-ml-8 flex items-center gap-2 text-sm text-gray before:h-px before:w-5 before:bg-gray-50"
            >
              {dayjs(memory.createdAt).format('D[de ]MMM[, ]YYYY')}
            </time>
            <Image 
              alt="" 
              src={memory.coverUrl} 
              width={592} 
              height={280}
              className="w-full aspect-video object-cover rounded-lg" 
            />
            <p>{memory.excerpt}</p>

            <a  href={`memories/especific/`} className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100">
              Ler Mais
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )
      })}
    </div>
  )
}
