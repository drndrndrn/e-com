import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

//import { DataTable } from "./_components/data-table";
//import { columns } from "./_components/columns";

const LessonsPage = async ({
  params
}: {
    params: { teacherId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const teacherId = await db.teacher.findUnique({
    where: {
        teacherId: params.teacherId,
        userId
    },
});


  return ( 
    <div className="p-6">
        {!teacherId && (
          <Link href="/teacher/add">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Додати заняття
          </Button>
        </Link>
        
        )}
      {/*<DataTable columns={columns} data={courses} />*/}
    </div>
   );
}
 
export default LessonsPage;