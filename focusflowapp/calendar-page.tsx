"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, BarChart3, Settings, LogIn, ChevronLeft, ChevronRight, Plus, X, Clock } from "lucide-react"

interface Task {
  id: number
  title: string
  date: string
  priority: "low" | "normal" | "high"
}

interface CalendarPageProps {
  onNavigateBack?: () => void
  onNavigateToAnalysis?: () => void
  onNavigateToSettings?: () => void
}

const priorityColors = {
  low: "bg-red-500",
  normal: "bg-blue-500",
  high: "bg-green-500",
}

const priorityLabels = {
  low: "Low Priority",
  normal: "Normal Priority",
  high: "High Priority",
}

export default function CalendarPage({
  onNavigateBack,
  onNavigateToAnalysis,
  onNavigateToSettings,
}: CalendarPageProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({ title: "", priority: "normal" as "low" | "normal" | "high" })

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(new Date(year, month + (direction === "next" ? 1 : -1), 1))
  }

  const formatDate = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  const getTasksForDate = (date: string) => {
    return tasks.filter((task) => task.date === date)
  }

  const handleDateClick = (day: number) => {
    const dateStr = formatDate(day)
    setSelectedDate(dateStr)
    setIsDialogOpen(true)
  }

  const addTask = () => {
    if (newTask.title.trim() && selectedDate) {
      const task: Task = {
        id: Date.now(),
        title: newTask.title.trim(),
        date: selectedDate,
        priority: newTask.priority,
      }
      setTasks([...tasks, task])
      setNewTask({ title: "", priority: "normal" })
      setIsDialogOpen(false)
    }
  }

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = formatDate(day)
      const dayTasks = getTasksForDate(dateStr)
      const isToday = today.getDate() === day && today.getMonth() === month && today.getFullYear() === year

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-24 border border-gray-200 p-1 cursor-pointer hover:bg-blue-50 transition-colors ${
            isToday ? "bg-blue-100 border-blue-300" : "bg-white"
          }`}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600" : "text-gray-700"}`}>{day}</div>
          <div className="space-y-1">
            {dayTasks.slice(0, 2).map((task) => (
              <div
                key={task.id}
                className={`text-xs px-1 py-0.5 rounded text-white truncate ${priorityColors[task.priority]}`}
                title={task.title}
              >
                {task.title}
              </div>
            ))}
            {dayTasks.length > 2 && <div className="text-xs text-gray-500">+{dayTasks.length - 2} more</div>}
          </div>
        </div>,
      )
    }

    return days
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#007ba7] to-[#3395b9] p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-16 bg-[#4a9b8e] rounded-2xl flex items-center justify-center shadow-lg">
            {/* Orange notebook */}
            <div className="relative w-11 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-r-sm">
              {/* Spiral binding area */}
              <div className="absolute left-0 top-0 w-2 h-full bg-orange-600 rounded-l-sm"></div>

              {/* Spiral binding holes/lines */}
              <div className="absolute left-0.5 top-1 w-1 h-0.5 bg-[#4a9b8e] rounded-full"></div>
              <div className="absolute left-0.5 top-2 w-1 h-0.5 bg-[#4a9b8e] rounded-full"></div>
              <div className="absolute left-0.5 top-3 w-1 h-0.5 bg-[#4a9b8e] rounded-full"></div>
              <div className="absolute left-0.5 top-4 w-1 h-0.5 bg-[#4a9b8e] rounded-full"></div>
              <div className="absolute left-0.5 top-5 w-1 h-0.5 bg-[#4a9b8e] rounded-full"></div>
              <div className="absolute left-0.5 top-6 w-1 h-0.5 bg-[#4a9b8e] rounded-full"></div>
              <div className="absolute left-0.5 top-7 w-1 h-0.5 bg-[#4a9b8e] rounded-full"></div>
              <div className="absolute left-0.5 top-8 w-1 h-0.5 bg-[#4a9b8e] rounded-full"></div>
            </div>

            {/* Clock icon */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full border-3 border-[#4a9b8e] flex items-center justify-center shadow-sm">
              <div className="relative w-4 h-4">
                {/* Clock hands */}
                <div className="absolute top-1/2 left-1/2 w-0.5 h-2 bg-[#4a9b8e] rounded-full transform -translate-x-1/2 -translate-y-full origin-bottom rotate-12"></div>
                <div className="absolute top-1/2 left-1/2 w-0.5 h-1.5 bg-[#4a9b8e] rounded-full transform -translate-x-1/2 -translate-y-full origin-bottom rotate-90"></div>
                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#4a9b8e] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          </div>
          <span className="text-white font-bold text-xl tracking-wide">FOCUS FLOW</span>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onNavigateBack}
            variant="secondary"
            size="sm"
            className="bg-[#66b0ca] hover:bg-[#3395b9] text-white border-0"
          >
            <Clock className="w-4 h-4 mr-1" />
            Timer
          </Button>
          <Button variant="secondary" size="sm" className="bg-white text-[#007ba7] border-0 font-medium">
            <Calendar className="w-4 h-4 mr-1" />
            Calendar
          </Button>
          <Button
            onClick={onNavigateToAnalysis}
            variant="secondary"
            size="sm"
            className="bg-[#66b0ca] hover:bg-[#3395b9] text-white border-0"
          >
            <BarChart3 className="w-4 h-4 mr-1" />
            Analysis
          </Button>
          <Button
            onClick={onNavigateToSettings}
            variant="secondary"
            size="sm"
            className="bg-[#66b0ca] hover:bg-[#3395b9] text-white border-0"
          >
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </Button>
          <Button variant="secondary" size="sm" className="bg-[#66b0ca] hover:bg-[#3395b9] text-white border-0">
            <LogIn className="w-4 h-4 mr-1" />
            Sign In
          </Button>
        </div>
      </div>

      {/* Calendar */}
      <div className="max-w-6xl mx-auto">
        <Card className="bg-white border-0 shadow-lg">
          {/* Calendar Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-800">
                {monthNames[month]} {year}
              </h1>
              <div className="flex gap-1">
                <Button onClick={() => navigateMonth("prev")} variant="outline" size="sm" className="h-8 w-8 p-0">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button onClick={() => navigateMonth("next")} variant="outline" size="sm" className="h-8 w-8 p-0">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Priority Legend */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">High Priority</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-600">Normal Priority</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-600">Low Priority</span>
              </div>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-6">
            {/* Week Days Header */}
            <div className="grid grid-cols-7 gap-0 mb-2">
              {weekDays.map((day) => (
                <div key={day} className="h-10 flex items-center justify-center font-medium text-gray-600 border-b">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-0 border-l border-t">{renderCalendarDays()}</div>
          </div>
        </Card>
      </div>

      {/* Add Task Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Task for {selectedDate}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="task-title">Task Title</Label>
              <Input
                id="task-title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Enter task title..."
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="task-priority">Priority</Label>
              <Select
                value={newTask.priority}
                onValueChange={(value: "low" | "normal" | "high") => setNewTask({ ...newTask, priority: value })}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      High Priority
                    </div>
                  </SelectItem>
                  <SelectItem value="normal">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      Normal Priority
                    </div>
                  </SelectItem>
                  <SelectItem value="low">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      Low Priority
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Show existing tasks for this date */}
            {selectedDate && getTasksForDate(selectedDate).length > 0 && (
              <div>
                <Label>Existing Tasks</Label>
                <div className="mt-2 space-y-2 max-h-32 overflow-y-auto">
                  {getTasksForDate(selectedDate).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded ${priorityColors[task.priority]}`}></div>
                        <span className="text-sm">{task.title}</span>
                      </div>
                      <Button
                        onClick={() => deleteTask(task.id)}
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button onClick={addTask} disabled={!newTask.title.trim()} className="flex-1">
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
              <Button onClick={() => setIsDialogOpen(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
