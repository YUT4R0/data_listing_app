import { FileDown, MoreHorizontal, Plus, Search } from 'lucide-react'
import { Header } from './components/Header'
import { Pagination } from './components/Pagination'
import { Tabs } from './components/Tabs'
import { Button } from './components/ui/button'
import { Control, Input } from './components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'

function App() {
  return (
    <div className="py-10 space-y-8">
      <div>
        <Header />
        <Tabs />
      </div>
      <main className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold">Tags</h1>
          <Button variant='primary'>
            <Plus className='size-3' />
            Create new
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <Input variant='filter'>
            <Search className='size-3'/>
            <Control placeholder='Search tags...'/>
          </Input>
          <Button>
            <FileDown className='size-3' />
            Export
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Amount of videos</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              Array.from({ length: 10 }).map((value, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell></TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className='font-medium'>React</span>
                        <span className='text-xs text-zinc-500'>e8cd6449-e813-4a42-95eb-c75788873597</span>
                      </div>
                    </TableCell>
                    <TableCell className='text-zinc-300'>
                      22 video(s)
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button size='icon'>
                        <MoreHorizontal />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        <Pagination pages={0} items={0} page={0} />
      </main>
    </div>
  )
}

export default App
