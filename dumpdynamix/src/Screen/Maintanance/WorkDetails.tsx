import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity, Pressable, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomStyle from '../../../custom';

const WorkDetails = ({ navigation, route }: any) => {
  const { work } = route.params;
  const [maintenanceTask, setMaintenanceTask] = useState<any>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  const maintenanceTasks = {
    "Routine Inspection": {
      description: "Routine inspection is a comprehensive check of the tyre's overall condition to ensure safety and performance. It involves examining the tyres for any visible damage, such as cracks, bulges, or punctures, and verifying that they meet operational and safety standards. The process also includes checking tyre pressure, inspecting the wheel assembly, and ensuring the spare tyre is in usable condition. Routine inspections are critical for preventing unexpected tyre failures and maintaining the vehicle's efficiency.",
      checklist: [
        "Check tyre pressure and adjust if necessary.",
        "Inspect for visible damage or wear on the tyre surface.",
        "Ensure wheel nuts are secure and properly tightened.",
        "Examine the spare tyre condition and readiness."
      ]
    },
    "Tread Depth Check": {
      description: "Tread depth check ensures that the tyre's grooves are deep enough to provide adequate grip and safety, especially in challenging conditions like wet or icy roads. Shallow tread depth can significantly reduce braking performance and increase the risk of skidding. Measuring the depth helps determine whether the tyres are safe to use or need replacement to maintain optimal road traction. This check is essential to ensure compliance with legal requirements and to enhance driving safety.",
      checklist: [
        "Use a tread depth gauge to measure all grooves.",
        "Inspect for uneven wear or flat spots on the tyre.",
        "Verify the tread depth against legal minimum standards.",
        "Document findings and recommend replacement if required."
      ]
    },
    "Alignment/Rotation": {
      description: "Wheel alignment and tyre rotation are essential maintenance activities to promote even wear and ensure the vehicle handles properly. Misaligned wheels can lead to rapid tyre wear, poor fuel efficiency, and a less comfortable ride. Rotation involves moving tyres to different positions on the vehicle to equalize wear. Together, these procedures enhance vehicle stability, extend tyre life, and improve overall driving experience. They are particularly crucial for maintaining consistent performance over long distances.",
      checklist: [
        "Inspect tyre wear patterns to determine rotation needs.",
        "Perform wheel alignment using a calibrated system.",
        "Check and adjust caster, camber, and toe angles as needed.",
        "Test drive to confirm proper alignment and handling."
      ]
    },
    "Puncture Repair": {
      description: "Puncture repair addresses damages caused by sharp objects penetrating the tyre, such as nails, screws, or glass. Ignoring a puncture can lead to air loss, reduced fuel efficiency, and potential tyre failure. The repair process involves identifying the puncture location, removing the object, and sealing the hole to prevent air leaks. This ensures the tyre maintains its structural integrity and continues to perform effectively without needing a full replacement.",
      checklist: [
        "Locate the puncture and remove the offending object.",
        "Clean and prepare the punctured area for repair.",
        "Apply a patch or plug to seal the puncture securely.",
        "Reinflate the tyre and test for air leaks."
      ]
    },
    "Valve Replacement": {
      description: "Valve replacement is a critical maintenance step to prevent air loss and maintain consistent tyre pressure. Damaged or leaking valves can result in underinflation, which affects fuel efficiency, handling, and tyre lifespan. The process involves removing the old valve and replacing it with a new one, ensuring an airtight seal. Regular valve checks and replacements help maintain tyre performance and reduce the risk of sudden deflation during use.",
      checklist: [
        "Deflate the tyre and remove the damaged valve.",
        "Install a new valve using proper tools.",
        "Reinflate the tyre to the recommended pressure.",
        "Check for air leaks around the valve area."
      ]
    },
    "Sidewall Repair": {
      description: "Sidewall repair involves addressing damages such as cuts, cracks, or abrasions to the tyre's sidewall. Since the sidewall supports the vehicle's weight and ensures stability, even minor damage can compromise the tyre's structural integrity. The repair process includes cleaning and patching the damaged area to restore the tyre's strength and usability. Proper sidewall repair can prevent further deterioration and extend the tyre's service life.",
      checklist: [
        "Inspect the sidewall to assess the severity of the damage.",
        "Clean and prepare the damaged area for repair.",
        "Apply a patch or other approved repair material.",
        "Reinflate the tyre and inspect for further issues."
      ]
    },
    "Retreading": {
      description: "Retreading is the process of replacing the worn-out tread on a tyre with a new layer, significantly extending its lifespan. This method is widely used for commercial and heavy-duty vehicles, offering a cost-effective alternative to buying new tyres. Retreading involves inspecting the tyre casing for damages, removing the old tread, and applying a new one through a curing process. It ensures the tyre remains safe and performs efficiently, while also reducing waste and environmental impact.",
      checklist: [
        "Inspect the tyre casing for damage or wear.",
        "Remove the old tread and prepare the casing for retreading.",
        "Apply a new tread layer and cure it properly.",
        "Perform quality checks to ensure the retread meets safety standards."
      ]
    }
  };
  

  const { maintenanceType ,  } = work;

  useEffect(() => {
    if (maintenanceType) {
      const task = maintenanceTasks[maintenanceType];
      if (task) {
        setMaintenanceTask(task);
        setCheckedItems(new Array(task.checklist.length).fill(false)); 
      } else {
        console.log("Maintenance task not found.");
      }
    } else {
      console.log("Maintenance type not specified.");
    }
  }, [maintenanceType]);

  const toggleCheckbox = (index: number) => {
    setCheckedItems((prevState) =>
      prevState.map((item, i) => (i === index ? !item : item))
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: "https://www.mining3.com/wp-content/uploads/2016/07/banner-surface-mining.jpg",
        }}
      />

      <Text style={{
        fontSize: 18,
        fontWeight: "bold",
      }}>Vehicle Id : <Text style={{
        fontSize: 18,
        fontWeight: "normal",
        color: CustomStyle.colour.primary
      }}>{work.vehicle_id}</Text> </Text>
      <Text style={styles.title}>{maintenanceType}</Text>
      {maintenanceTask ? (
        <View style={styles.details}>
          <Text style={styles.description}>{maintenanceTask.description}</Text>
          <Text style={styles.checklistTitle}>Checklist:</Text>
          <FlatList
            data={maintenanceTask.checklist}
            renderItem={({ item, index }) => (
              <View style={styles.checklistItem}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => toggleCheckbox(index)}
                >
                  {checkedItems[index] && <View style={styles.checkedBox} />}
                </TouchableOpacity>
                <Text style={styles.itemText}>{item}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />

      

            <Pressable
            style={{ marginTop: 20, padding: 10, backgroundColor: CustomStyle.colour.primary, borderRadius: 5 }}
            onPress={() => navigation.navigate("CompleteMaintance" , {work})}
            >

            <Text style={{ color: "#fff", textAlign: "center" }}>Complete Work</Text>
            </Pressable>
           

               

        </View>
      ) : (
        <Text style={styles.error}>Maintenance details not available.</Text>
      )}
    </ScrollView>
  );
};

export default WorkDetails;

const styles = StyleSheet.create({
  container: {
padding: 10,
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  details: {
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
  },
  checklistTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#000",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkedBox: {
    width: 14,
    height: 14,
    backgroundColor: "#000",
  },
  itemText: {
    fontSize: 16,
    lineHeight: 20,
  },
  error: {
    color: "red",
    marginTop: 10,
    fontSize: 16,
  },
});
