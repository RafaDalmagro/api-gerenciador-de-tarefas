type Tasks = {
    id?: number;
    title: string;
    description: string;
    status?: TaskStatus;
    priority?: Priority;
    assignedTo: number;
    teamId: number;
    createdAt?: Date;
    updatedAt?: Date;
};
