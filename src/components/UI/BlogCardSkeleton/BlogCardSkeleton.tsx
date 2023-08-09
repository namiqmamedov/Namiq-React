import {
    Card,
    CardActions,
    CardContent,
    Grid,
    Skeleton
} from "@mui/material";

export default function BlogCardSkeleton() {
    return (
        <Grid item xs component={Card} className="!mb-11">

            <Skeleton sx={{ height: 367 }} animation="wave" variant="rectangular" />
            <CardContent style={{marginBottom: '-22px'}}>
                <>
                    <Skeleton animation="wave" height={15} width="45%" style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={15} width="50%" />
                </>
            </CardContent>
            <CardActions style={{marginBottom: '-28px'}}>
                <>
                    <Skeleton animation="wave" height={120} width='98%' />
                </>
            </CardActions>
            <CardActions  className="!flex !justify-end mr-4 mb-4" >
            <Skeleton animation="wave" height={50} width='12%'/>
            </CardActions>

        </Grid>
    )
}