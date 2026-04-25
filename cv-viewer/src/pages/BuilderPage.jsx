import { CvForm } from "../components/CvForm";
import { useCvBuilder } from "../hooks/UseCvBuilder";
import { CvPreview } from "../components/CvPreview";
import { Box, Typography, CircularProgress, Grid } from "@mui/material";

export const BuilderPage = () => {
  const { form, loading, error, result, handleChange, handleSubmit } = useCvBuilder();

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%', 
      overflow: 'hidden' 
    }}>
      
      {/* Header - Fixed */}
      <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>AI CV Builder</Typography>
        <Typography variant="body2" color="text.secondary">Enter Your Professional Details</Typography>
      </Box>

      {/* Content - Scrollable */}
      <Grid container sx={{ flexGrow: 1, overflowY: 'hidden' }}>
        
        {/* Left Column: Form */}
        <Grid item xs={12} md={6}>
          <CvForm
            form={form}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        </Grid>

        {/* Right Column: Preview */}
        <Grid  xs={12} md={6} >
          <Typography variant="subtitle2" sx={{ alignSelf: 'flex-start', mb: 2, fontWeight: 700 }}>
            Preview
          </Typography>
          
          <Box sx={{ width: '100%', maxWidth: '800px' }}>
            {loading && <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 4 }} />}
            {error && <Typography color="error">{error}</Typography>}
            {result && <CvPreview result={result} />}
            {!result && !loading && (
               <Box sx={{ p: 4, border: '2px dashed', borderColor: 'divider', textAlign: 'center', borderRadius: 2 }}>
                 <Typography color="text.secondary">Submit the form to generate preview</Typography>
               </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};